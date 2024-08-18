from django.shortcuts import render
from rest_framework import viewsets
import json
from .Serializers import FoodItemSerializer
from .models import FoodItem, OrderItem, Order
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class FoodViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer


@csrf_exempt
def order(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        items = data['items']
        customer = data['customer']
        address = data['address']
        totalPrice = data['totalPrice']

        order = Order(customer=customer, address=address, price=totalPrice)
        order.save()

        for item in items:
            orderItem = OrderItem(
                name=item['name'],
                quantity=item['quantity'],
                price=item['price'],
                order=order
            )
            orderItem.save()

        order.save()

        return JsonResponse({'status': 'success', 'message': 'Data received'})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Only POST method is allowed'}, status=405)
