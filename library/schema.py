import graphene
from graphene_django import DjangoObjectType
from TODO.models import Todo, User, Project

class UserType(DjangoObjectType): 
    class Meta: 
        model = User 
        fields ='__all__'

class ProjectType(DjangoObjectType): 

    class Meta: 
        model = Project 
        fields ='__all__' 

class TodoType(DjangoObjectType): 
    class Meta: 
        model = Todo 
        fields ='__all__'
        
class UserMutation(graphene.Mutation): 
    class Arguments: 
        username = graphene.String(required=True) 
        email = graphene.String() 

    user = graphene.Field(UserType)
        
     
    @classmethod 
    def mutate(cls, root, info, username, email): 
        user = User.objects.get(username=username) 
        user.email = email
        user.save() 
        return UserMutation(user=user)

class Query(graphene.ObjectType): 

    all_projects = graphene.List(ProjectType)
    all_todoes = graphene.List(TodoType)

    def resolve_all_projects(root, info): 
        return Project.objects.all()

    def resolve_all_todoes(root, info): 
        return Todo.objects.all()

class Mutation(graphene.ObjectType): 
    update_user_email= UserMutation.Field()
    

schema = graphene.Schema(query=Query, mutation = Mutation)
