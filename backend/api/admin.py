from django.contrib import admin
from .models import FoodItem, Order, OrderItem


class FoodItemAdmin(admin.ModelAdmin):
    model = FoodItem
    list_display = ('name', 'price')


class OrderItemAdmin(admin.ModelAdmin):
    model = OrderItem
    list_display = ('name', 'quantity', 'price')


class OrderAdmin(admin.ModelAdmin):
    model = Order
    list_display = ('customer', 'address', 'price')


admin.site.register(FoodItem, FoodItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
