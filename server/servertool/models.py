from django.db import models

class Webservicelist(models.Model):
    webserviceid    = models.CharField(db_column='webServiceID', primary_key=True, max_length=10)  # Field name made lowercase.
    name            = models.CharField(db_column='webServiceName',max_length=100, blank=True, null=True)
    reputation      = models.FloatField(blank=True, null=True)  # Field name made lowercase.
    price           = models.FloatField(blank=True, null=True)
    duration        = models.IntegerField(blank=True, null=True)
    provider        = models.CharField(max_length=50, blank=True, null=True)
    url             = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'webservicelist'

class Initialgoalparameter(models.Model):
    id = models.AutoField(primary_key=True, default=None)
    transactionid = models.BigIntegerField(db_column='transactionID')  # Field name made lowercase.
    iorg = models.CharField(max_length=10)
    parameterid = models.ForeignKey('Parameterlist', models.DO_NOTHING, db_column='parameterID')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'initialgoalparameter'
        # unique_together = (('transactionid', 'iorg', 'parameterid'),)

class Parameterlist(models.Model):
    parameterid = models.CharField(db_column='parameterID', primary_key=True, max_length=10)  # Field name made lowercase.
    name = models.CharField(db_column='parameterName', max_length=100, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'parameterlist'

class Inputparameter(models.Model):
    id = models.AutoField(primary_key=True, default=None)
    webserviceid    = models.ForeignKey(Webservicelist, models.DO_NOTHING, db_column='webServiceID')  # Field name made lowercase.
    parameterid     = models.ForeignKey(Parameterlist, models.DO_NOTHING, db_column='parameterID')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'inputparameter'
        # unique_together = (('webserviceid', 'parameterid'),)

class Outputparameter(models.Model):
    id = models.AutoField(primary_key=True, default=1)
    webserviceid = models.ForeignKey(Webservicelist, models.DO_NOTHING, db_column='webServiceID')  # Field name made lowercase.
    parameterid = models.ForeignKey(Parameterlist, models.DO_NOTHING, db_column='parameterID')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'outputparameter'
        # unique_together = (('webserviceid', 'parameterid'),)

class Result(models.Model):
    id = models.AutoField(primary_key=True, default=1)
    transactionid = models.BigIntegerField(db_column='transactionID')  # Field name made lowercase.
    stage = models.IntegerField()
    webserviceid = models.BigIntegerField(db_column='webServiceID')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'result'
        # unique_together = (('transactionid', 'stage', 'webserviceid'),)


