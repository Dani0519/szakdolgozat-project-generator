#!/usr/bin/python
# -*- coding: utf-8 -*-

import unittest
import imp
import os
import requests
import json
import sys

slack = imp.load_source('slack_module', '../Core/curl.py')

class TestCurlFunctions(unittest.TestCase):

  def test_add_project_to_dashboard(self):
    result = slack.createDashboardProject('name-web.json')
    self.assertEqual(result.status_code, 200)
  
  def test_create_slack_channel(self):
    existingChannels = []
    slack.createSlackChannel('name-web.json')
    response = requests.get(
      url='https://slack.com/api/conversations.list?token==1'
    )
    json_data = json.loads(response.text)
    for i in json_data['channels']:
      existingChannels.append([i['name']])
    contains = ['name-deploys'] in existingChannels
    assert bool(contains) != False
    
  
  def test_all_user_added_to_channel(self):
    users = ['']
    result = slack.createSlackChannel('name-web.json')
    response = requests.get(
      url='https://slack.com/api/channels.info?token=={}&pretty=1'.format(result[1])
    )
    json_data = json.loads(response.text)
    self.assertCountEqual(json_data['channel']['members'], users)

unittest.main()