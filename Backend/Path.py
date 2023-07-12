from models import Location,adjacency
from database import get_sess

class adj:
    def __init__(self,name,value):
        self.name:str=name
        self.value=value

class Node :
    def __init__(self,node):
        self.node=node
        self.adjList=[]

    def link(self,node:adj):
        self.adjList.append(node)

    def view(self):
        return self.adjList


def genNodes(GRAPH):
    db=get_sess()
    temp=db.query(Location).all()
    for entry in temp:
        GRAPH[entry.Location_ID]=Node(entry)

def genEdges(GRAPH):
    db=get_sess()
    temp=db.query(adjacency).all()
    for entry in temp:
        GRAPH[entry.Location_ID].link(adj(entry.Adjacent_ID,entry.Congestion))





class HeapNode:
    def __init__(self,name,value,par):
        self.name:str=name
        self.value=value
        self.par=par

class Heap:
    def __init__(self,start):
        self.heap=[(0,start,None)]

    def pop(self):
        temp=self.heap.pop(0)
        return HeapNode(temp[1],temp[0],temp[2])
    
    def push(self,curr:HeapNode,node,gap):
        dist=curr.value+gap
        for entry in self.heap:
            if(entry[1]==node):
                if(entry[0]>dist):
                    break
        
        self.heap.append((dist,node,curr.name))
        self.heap.sort()
        return

def BestPath(start,end):
    GRAPH={}
    genNodes(GRAPH)
    genEdges(GRAPH)

    curr=HeapNode(0,start,None)
    heap=Heap(start)

    DATA={}


    while(curr.name!=end):
        curr:HeapNode=heap.pop()
        DATA[curr.name]=curr
        for entry in GRAPH[curr.name].view():
            try:
                DATA[entry.name]
            except:
                heap.push(curr,entry.name,entry.value)

    res=[]
    while(curr.par!=None):
        res.append(curr.name)
        curr=DATA[curr.par]
    res.append(start)
    res.reverse()

    return res



