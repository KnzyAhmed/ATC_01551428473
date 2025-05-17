# ATC_01551428473

for the tech stack: The frontend is developed with react and I used a react router dom, and the backend is developed with Django.

---

How to set up:
clone the repositories and install the dependencies  

open two terminals  
then run the following commands to run the frontend on one terminal:  
npm install  
npm run dev  
  
and on the other terminal run the following commands to run the backend:  
python -m venv venv  
source venv/bin/activate   
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers  
python manage.py makemigrations  
python manage.py migrate  
python manage.py runserver  
