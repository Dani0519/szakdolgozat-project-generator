#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import os

def checkChanges():
  # Open the data.json file
  with open('data.json', 'r+') as file:
    projects = json.load(file)

    new_files = []

    # Loop in all files in the IntegratedProjects folder
    for file in os.listdir('../IntegratedProjects/'):
      if file not in projects:
        if file != 'unit-testing.json':
          new_files.append(file)
    return new_files