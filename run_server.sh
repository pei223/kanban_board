pwd
cd ./kanban_board_backend
python manage.py runserver localhost:8000 --settings=config.prod_settings &
cd ./../kanban_board_frontend
npm run dev &
cd ./../