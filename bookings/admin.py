from django.contrib import admin
from .models import Booking

# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "email",
        "phone",
        "service",
        "booking_date",
        "booking_time",
        "created_at",
    )

    list_filter = (
        "service",
        "booking_date",
    )

    search_fields = (
        "name",
        "email",
        "phone",
    )