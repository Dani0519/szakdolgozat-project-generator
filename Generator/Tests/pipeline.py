#!/usr/bin/python
# -*- coding: utf-8 -*-

import unittest
import imp
import requests
import json
import jenkins
import os

jenkins_module = imp.load_source('jenkins_module', '../Core/pipeline.py')


class TestPipelineFunctions(unittest.TestCase):
  
  def test_create_view(self):
    views = []
    server = jenkins.Jenkins('')
    jenkins_module.createPipeline('unit-testing.json')
    response = requests.get(
      url='h
    )
    json_data = json.loads(response.text)
    for i in range(len(json_data['views'])):
      views.append(json_data['views'][i]['name'])
    server.delete_view('UNIT')
    self.assertIn('UNIT', views)

  def test_view_exist(self):
    result = jenkins_module.createPipeline('name-web.json')
    assert bool (result[0]) == False

  def test_view_exist_and_pipe_exist(self):
    result = jenkins_module.createPipeline('name-web.json')
    self.assertCountEqual(result, [False, False])

  def test_create_pipe(self):
    jobs = []

    server = jenkins.Jenkins('')
    jenkins_module.createPipeline('unit-testing.json')

    response = requests.get(
      url=''
    )

    json_data = json.loads(response.text)

    for i in range(len(json_data['jobs'])):
      jobs.append(json_data['jobs'][i]['name'])

    server.delete_job('unit-test')
    server.delete_view('UNIT')
    self.assertIn('unit-test', jobs)

unittest.main()