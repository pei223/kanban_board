if [ $1 = "prod" ]; then
    python manage.py runserver --settings=config.prod_settings
else
    python manage.py runserver --settings=config.dev_settings
fi