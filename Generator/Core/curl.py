#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import requests

def createDashboardProject(file):
  f_json = open('../IntegratedProjects/{}'.format(file), 'rb').read()
  response = requests.post(
    url='https://inclouded.sed.hu/monitorbe/firebase/project',
    headers={
      'key': '',
      'Content-Type': 'application/json',
    },
    data=f_json
  )
  return response

def createSlackChannel(file):
  responses = []
  # Load the configuration file
  with open('../IntegratedProjects/{}'.format(file), 'r', encoding="utf-8") as f_json:

    # Parse the configuration file
    configuration = json.load(f_json)

    # Create the slack channel
    response = requests.get(
      url='https://slack.com/api/channels.join?token=&name={}-deploys&pretty=1'.format(configuration['name'].lower())
    )
    responses.append(response.status_code)

    # Get the created channel id
    decoded_json = response.content.decode()
    channel_id = json.loads(decoded_json)['channel']['id']
    responses.append(channel_id)

    # Join to the channel
    response = requests.post(
      url='https://slack.com/api/conversations.join',
      headers={
        'Content-type': 'application/json; charset=utf-8',
        'Authorization': ''
      },
      data='{"channel":"' + channel_id + '"}'
    )

    # Invite Vilmos to the channel
    response = requests.post(
      url='https://slack.com/api/conversations.invite',
      headers={
        'Content-type': 'application/json; charset=utf-8',
        'Authorization': ''
      },
      data='{"channel":"' + channel_id + '","users":}'
    )
    return responses
