from django.urls import path

from . import views

app_name = 'Electrum'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('home', views.HomeView.as_view(), name='home_name'),
    path('about', views.AboutView.as_view(), name='about_name'),
    path('faqs', views.FaqView.as_view(), name='faqs_name'),
    path('cite', views.CiteView.as_view(), name='cite_name'),

    path('ajax/run_substructure/', views.substructure, name='ajax_substructure'),
]