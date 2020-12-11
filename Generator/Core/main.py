#!/usr/bin/python
# -*- coding: utf-8 -*-

from check import checkChanges
from pipeline import createPipeline
from project_files import generateProjectFiles
import curl

# Main
new_files = checkChanges()

# Generating pipeline & data
for file in new_files:
  print('Generating data for {}'.format(file))
  createPipeline(file)
  generateProjectFiles(file)
  print('Generating slack channel'.format(file))
  curl.createSlackChannel(file)
  print('Add the project to the Inclouded Dashboard')
  curl.createDashboardProject(file)