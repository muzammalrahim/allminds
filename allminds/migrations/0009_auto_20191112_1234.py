# Generated by Django 2.2.7 on 2019-11-12 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0008_auto_20191107_1717'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='first_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
