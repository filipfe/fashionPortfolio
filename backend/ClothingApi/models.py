from django.db import models

# Create your models here.

SHOES = 'shoes'
JACKET = 'jacket'
TSHIRT = 'tshirt'
HOODIES = 'hoodies'
TROUSERS = 'trousers'

TYPES = [
    (SHOES, 'Shoes'),
    (JACKET, 'Jackets'),
    (TSHIRT, 'Tshirts'),
    (HOODIES, 'Hoodies'),
    (TROUSERS, 'Trousers'),
]

WOMEN = 'women'
MEN = 'men'

SEX = [
    (WOMEN, 'Women'),
    (MEN, 'Men'),
]

class Clothing(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='')
    price = models.FloatField()
    type = models.CharField(max_length=8, choices=TYPES, default='Shoes')
    sex = models.CharField(max_length=5, choices=SEX, default='Women')
    trending = models.BooleanField(default=False)
    collection = models.BooleanField(default=False)
    new = models.BooleanField(default=False)
    sale = models.IntegerField(default=0)
    id = models.AutoField
    
    def __str__(self):
        return self.title
