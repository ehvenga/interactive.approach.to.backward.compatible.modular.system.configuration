# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Careerpath(models.Model):
    careerpathid = models.CharField(db_column='careerPathID', primary_key=True, max_length=4)  # Field name made lowercase.
    careerpathname = models.CharField(db_column='careerPathName', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'careerpath'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Initialgoalparameter(models.Model):
    transactionid = models.BigIntegerField(db_column='transactionID', primary_key=True)  # Field name made lowercase. The composite primary key (transactionID, iorg, parameterID) found, that is not supported. The first column is selected.
    iorg = models.CharField(max_length=10)
    parameterid = models.ForeignKey('Parameterlist', models.DO_NOTHING, db_column='parameterID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'initialgoalparameter'
        unique_together = (('transactionid', 'iorg', 'parameterid'),)


class Inputparameter(models.Model):
    webserviceid = models.CharField(db_column='webServiceID', primary_key=True, max_length=10)  # Field name made lowercase. The composite primary key (webServiceID, parameterID) found, that is not supported. The first column is selected.
    parameterid = models.CharField(db_column='parameterID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inputparameter'
        unique_together = (('webserviceid', 'parameterid'),)


class Knowledgeforcareerpath(models.Model):
    careerpathid = models.CharField(db_column='careerPathID', primary_key=True, max_length=4)  # Field name made lowercase. The composite primary key (careerPathID, knowledgeID) found, that is not supported. The first column is selected.
    knowledgeid = models.CharField(db_column='knowledgeID', max_length=6)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'knowledgeforcareerpath'
        unique_together = (('careerpathid', 'knowledgeid'),)


class Lhs(models.Model):
    ruleid = models.IntegerField(primary_key=True)  # The composite primary key (ruleid, courseid) found, that is not supported. The first column is selected.
    courseid = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'lhs'
        unique_together = (('ruleid', 'courseid'),)


class Outputparameter(models.Model):
    webserviceid = models.CharField(db_column='webServiceID', primary_key=True, max_length=10)  # Field name made lowercase. The composite primary key (webServiceID, parameterID) found, that is not supported. The first column is selected.
    parameterid = models.CharField(db_column='parameterID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'outputparameter'
        unique_together = (('webserviceid', 'parameterid'),)


class Parameterhierarchy(models.Model):
    id = models.BigAutoField(primary_key=True)
    parentparameterid = models.CharField(db_column='parentParameterID', max_length=10)  # Field name made lowercase.
    childparameterid = models.CharField(db_column='childParameterID', max_length=10)  # Field name made lowercase.
    noofdepth = models.IntegerField(db_column='noOfDepth')  # Field name made lowercase.
    noofchildren = models.IntegerField(db_column='noOfChildren')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'parameterhierarchy'


class ParameterhierarchyOld(models.Model):
    parentparameterid = models.CharField(db_column='parentParameterID', primary_key=True, max_length=10)  # Field name made lowercase. The composite primary key (parentParameterID, childParameterID, noOfDepth, noOfChildren) found, that is not supported. The first column is selected.
    childparameterid = models.CharField(db_column='childParameterID', max_length=10)  # Field name made lowercase.
    noofdepth = models.IntegerField(db_column='noOfDepth')  # Field name made lowercase.
    noofchildren = models.IntegerField(db_column='noOfChildren')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'parameterhierarchy_old'
        unique_together = (('parentparameterid', 'childparameterid', 'noofdepth', 'noofchildren'),)


class ParameterhierarchyTotal(models.Model):
    parentparameterid = models.CharField(db_column='parentParameterID', max_length=30, blank=True, null=True)  # Field name made lowercase.
    childparameterid = models.CharField(db_column='childParameterID', max_length=30, blank=True, null=True)  # Field name made lowercase.
    noofdepth = models.IntegerField(db_column='noOfDepth', blank=True, null=True)  # Field name made lowercase.
    noofchildren = models.IntegerField(db_column='noOfChildren', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'parameterhierarchy_total'


class Parameterlist(models.Model):
    parameterid = models.CharField(db_column='parameterID', primary_key=True, max_length=10)  # Field name made lowercase.
    parametername = models.CharField(db_column='parameterName', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'parameterlist'


class Result(models.Model):
    transactionid = models.BigIntegerField(db_column='transactionID', primary_key=True)  # Field name made lowercase. The composite primary key (transactionID, stage, webServiceID) found, that is not supported. The first column is selected.
    stage = models.IntegerField()
    webserviceid = models.CharField(db_column='webServiceID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'result'
        unique_together = (('transactionid', 'stage', 'webserviceid'),)


class Rhs(models.Model):
    ruleid = models.IntegerField(primary_key=True)  # The composite primary key (ruleid, courseid) found, that is not supported. The first column is selected.
    courseid = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'rhs'
        unique_together = (('ruleid', 'courseid'),)


class Ruleinfo(models.Model):
    ruleid = models.IntegerField(primary_key=True)
    support = models.FloatField(blank=True, null=True)
    confidence = models.FloatField(blank=True, null=True)
    lift = models.FloatField(blank=True, null=True)
    count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ruleinfo'


class Treetable(models.Model):
    node_name = models.CharField(max_length=255, blank=True, null=True)
    parent_id = models.IntegerField(blank=True, null=True)
    depth = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'treetable'
        unique_together = (('parent_id', 'node_name'),)


class Webservicelist(models.Model):
    webserviceid = models.CharField(db_column='webServiceID', primary_key=True, max_length=10)  # Field name made lowercase.
    webservicename = models.CharField(db_column='webServiceName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    reputation = models.FloatField(blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    provider = models.CharField(max_length=50, blank=True, null=True)
    url = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'webservicelist'
