# Food Order App

A modern full-stack food ordering application built with **Next.js 15+**, **Tailwind CSS v4**, and **Django REST Framework**.

## Deployment on Render

### 1. Backend (Django)
- **Service Type**: Web Service
- **Runtime**: Python
- **Root Directory**: `backend` (Set this in Render's "Advanced" settings)
- **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
- **Start Command**: `gunicorn backend.wsgi`
- **Environment Variables**:
  - `SECRET_KEY`: (Your secret key)
  - `DEBUG`: `False` (for production)
  - `ALLOWED_HOSTS`: `*` (or your specific domain)

### 2. Frontend (Next.js)
- **Service Type**: Static Site (or Web Service for SSR)
- **Build Command**: `npm run build`
- **Publish Directory**: `.next` (for Web Service) or `out` (for Static Export)
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL`: (The URL of your deployed Render backend, e.g., `https://your-backend.onrender.com`)

## Features
- **Landing Page**: Choose between ordering food or the admin dashboard.
- **Admin Dashboard**: Full CRUD for food items with custom authentication.
- **Admin Login**:
  - **Username**: `demo`
  - **Password**: `demo`
- **Modern UI**: Custom purple color scheme, smooth transitions, and responsive design.
- **Flash Messages**: Toast notifications for successful orders.
- **Custom Modals**: Premium delete confirmation dialogs.

## Local Development

### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
