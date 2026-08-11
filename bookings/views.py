from django.shortcuts import render
from rest_framework import viewsets
from bookings.models import Booking
from bookings.serializers import BookingSerializer

# Create your views here.
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by("-created_at")
    serializer_class = BookingSerializer
