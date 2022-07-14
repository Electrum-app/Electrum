from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.http.multipartparser import MultiPartParser
from django.urls import reverse
from django.views import generic
from django.utils import timezone

import re 

# Create your views here.
from .static.Electrum.python.substructure_enrich.substructure_enrich import __main__ as substructure_enrich

class IndexView(generic.ListView):
    template_name = 'Electrum/index.html'

    def get_queryset(self):
        return ""

class HomeView(generic.ListView):
    template_name = 'Electrum/index.html'

    def get_queryset(self):
        return ""

class AboutView(generic.ListView):
    template_name = 'Electrum/about.html'

    def get_queryset(self):
        return ""

class FaqView(generic.ListView):
    template_name = 'Electrum/faqs.html'

    def get_queryset(self):
        return ""

class CiteView(generic.ListView):
    template_name = 'Electrum/cite.html'

    def get_queryset(self):
        return ""

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt 
def substructure(
        request,
        _start="Content-Disposition: form-data;",
        _end="------WebKitFormBoundary"):

    items = re.findall(
        r'{0}(.*?){1}'.format(_start, _end), 
        request.POST["this_data"], 
        flags=re.DOTALL | re.MULTILINE)

    _obj = {}
    for i in items:
        key = re.findall(
            r'{0}(.*?){1}'.format("\ name=\"", "\""), 
            i, 
            flags=re.DOTALL | re.MULTILINE)[0]
        value = i.split("\r\n\r\n")[1]
        _obj[key] = value

    try:
        results = substructure_enrich(
            _obj["protein"].strip(), 
            _obj["threshold"].strip(), 
            _obj["file"])
    except (KeyError):
        raise Exception("Unable to run substructure enrichment analysis.")
    else:
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return results