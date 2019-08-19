#!/usr/bin/env python3.6

import mongoengine
import flask
import flask_restful
from flask_cors import CORS, cross_origin
import json
import datetime
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity)

mongoengine.connect('mongoengine_test', host='localhost', port=27017)

app = flask.Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'
api = flask_restful.Api(app)
jwt = JWTManager(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


class BlogModel(mongoengine.Document):
    title = mongoengine.StringField(required=True, max_length=200)
    content = mongoengine.StringField(required=True)
    blogID = mongoengine.IntField(required=True, unique=True)
    tags = mongoengine.ListField(mongoengine.StringField())
    published = mongoengine.StringField(
        default=datetime.datetime.today().strftime("%B %d %Y"))


class NextIndex(flask_restful.Resource):
    def get(self):
        num = BlogModel.objects.count()
        resp = {'count': num}
        return flask.jsonify(resp)


class BlogPost(flask_restful.Resource):
    def get(self, blogID):
        posting = BlogModel.objects(blogID=blogID)

        if(posting.count() == 0):
            return flask.jsonify("")
        else:
            response = {'content': posting[0].content, 'title': posting[0].title,
                        'blogID': posting[0].blogID, 'published': posting[0].published, 'tags': posting[0].tags}
            return flask.jsonify(response)

    # @jwt_required
    def post(self, blogID):
        resp = flask.request.get_json()
        exist = BlogModel.objects(blogID=blogID)
        taglist = resp['tags'].split(',')

        # remove empty tags
        taglist = [x for x in taglist if x.strip(" ") != ""]

        # maybe should put this in put
        if(exist.count() > 0):
            # should only be one blog per ID
            # just incase take first one
            posting = exist[0]
            posting.title = resp['title']
            posting.content = resp['content']
            posting.blogID = blogID
            posting.published = datetime.datetime.today().strftime("%B %d %Y")
            posting.tags = taglist

        else:
            posting = BlogModel(
                resp['title'], resp['content'], blogID, taglist)

        posting.save()

        return flask.jsonify(resp)

    @jwt_required
    def delete(self, blogID):
        blogSet = BlogModel.objects(blogID=blogID)
        if(blogSet.count() > 0):
            for blog in blogSet:
                response = {'title': blog.title, 'content': blog.content,
                            'blogID': blog.blogID, 'published': blog.published}
                blog.delete()

        return flask.jsonify(response)


class Login(flask_restful.Resource):
    def post(self):
        access_token = create_access_token(identity="admin")
        return flask.jsonify(access_token)


class BlogList(flask_restful.Resource):
    def get(self):
        limit = flask.request.args.get('limit', default=10, type=int)
        start = flask.request.args.get('start', default=0, type=int)

        query = flask.request.args.get('q', type=str)
        if(query):
            postings = BlogModel.objects(tags=query)[start:(start + limit)]
        else:
            postings = BlogModel.objects()[start:(start + limit)]

        postList = []

        for post in postings:
            postList.append({'content': post.content, 'title': post.title,
                             'blogID': post.blogID, 'published': post.published, 'tags': post.tags})

        resp = {'posts': postList}
        return flask.jsonify(resp)


class Tags(flask_restful.Resource):
    def get(self):
        tagsDict = dict()

        for item in BlogModel.objects:
            for tag in item.tags:
                if tag in tagsDict:
                    tagsDict[tag] = tagsDict[tag] + 1
                else:
                    tagsDict[tag] = 1

        tagList = list()
        for key, val in tagsDict.items():
            tagList.append({'tagname': key, 'count': val})

        return flask.jsonify({'tags': tagList})


api.add_resource(BlogPost, '/blog/<blogID>')
api.add_resource(BlogList, '/blog')
api.add_resource(NextIndex, '/count')
api.add_resource(Login, '/login')
api.add_resource(Tags, '/tags')


def clear():
    for x in BlogModel.objects:
        x.delete()


if __name__ == '__main__':

    clear()
    app.run(debug=True, port=5002)
    mongoengine.disconnect('mongoengine_test')
