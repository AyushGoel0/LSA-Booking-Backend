from django.utils import timezone
from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, data):
        booking_date = data.get("booking_date")
        booking_time = data.get("booking_time")
        service = data.get("service")

        # 1. Don't allow bookings in the past
        if booking_date < timezone.localdate():
            raise serializers.ValidationError({
                "booking_date": "Booking date cannot be in the past."
            })

        # 2. Prevent duplicate booking for same service/date/time
        existing_booking = Booking.objects.filter(
            service=service,
            booking_date=booking_date,
            booking_time=booking_time,
        )

        # When updating an existing booking, exclude itself
        if self.instance:
            existing_booking = existing_booking.exclude(
                pk=self.instance.pk
            )

        if existing_booking.exists():
            raise serializers.ValidationError({
                "booking_time": "This time slot is already booked for this service."
            })

        return data