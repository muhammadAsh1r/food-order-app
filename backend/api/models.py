from django.db import models


class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    name = models.CharField(max_length=50, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(null=True, max_digits=10, decimal_places=2)


class Order(models.Model):
    customer = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=150, null=True)
    items = models.ForeignKey(OrderItem, on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
