# Generated by Django 4.1 on 2022-08-30 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_clothing_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clothing',
            name='price',
            field=models.FloatField(),
        ),
    ]
