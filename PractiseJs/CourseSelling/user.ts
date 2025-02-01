interface User{
    name: string,
    age: number
}

function isLegal(User: User[]){
    User.forEach((u)=>{
        if(u.age>18){
            console.log(u.name);
        }
    })
}

isLegal([{name:"master prs", age:17}, {name:"prs", age:19}, {name:"xprs", age:23}, {name:"praneet", age:18} ]);