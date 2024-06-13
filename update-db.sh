#!/bin/bash

atlas migrate apply --env gorm --url "sqlite://$(pwd)/gorm.db"