from django.db import models


class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Order(models.Model):
    customer = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=150, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(null=True, max_digits=10, decimal_places=2)
