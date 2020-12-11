#!/usr/bin/python
# -*- coding: utf-8 -*-

from check import checkChanges
from pipeline import createPipeline
from project_files import generateProjectFiles
import curl
import sys
import os

file = sys.argv[1]

# Check the file exists
if os.path.exists('../IntegratedProjects/{}'.format(file)):
  print('Generating data for {}'.format(file))
  createPipeline(file)
  generateProjectFiles(file)
  print('Generating slack channel'.format(file))
  curl.createSlackChannel(file)
  print('Add the project to the Inclouded Dashboard')
  curl.createDashboardProject(file)
else:
  print('{} file does not exists in the IntegratedProjects folder!'.format(file))
  exit(1)