#!/bin/bash

docker save mufdvr/todo_list | bzip2 | ssh -p 4181 -o "StrictHostKeyChecking no" mika@185.175.119.14 'bunzip2 | docker load && ./start_todo_list.sh'