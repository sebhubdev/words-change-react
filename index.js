class ChangingWord
{   
    constructor(targetId=null,list=[],seconds)
    {
        this.list=list
        this.targetId=targetId
        this.counter=0;
        this.seconds=seconds;
        this.transition=50
        this.activate(list,targetId)
    }
    activate=()=>
    {   
        document.getElementById(this.targetId).innerHTML=this.list[this.counter]
        setInterval(()=>{this.changeWord()},this.seconds)
    }
    changeWord=()=>
    {   
        let phrase1=this.list[this.counter];
        this.counter++
        if(this.counter===this.list.length)this.counter=0;
        let phrase2=this.list[this.counter];
        let changingTime=this.seconds/10;  
        phrase1=this.fragmentPhrase(phrase1);
        phrase2=this.fragmentPhrase(phrase2);
        phrase2.reverse();
        phrase2[0].reverse();
        let index=Math.max(phrase1[0].length,phrase2[0].length);       
        setTimeout(() => {
            let finalPrase=(phrase1[0].concat(phrase2[1]).concat(phrase1[2])).join('')
            document.getElementById(this.targetId).innerHTML=finalPrase;
            this.changeLetters(index,phrase1,phrase2)            
        }, this.transition);
    }
    invertPhrase=(phrase,first,last)=>
    {
        setTimeout(() => {
            let l1=phrase[0][first]
            let l2=phrase[2][last]
            phrase[0][first]=l2            
            phrase[2][last]=l1
            let finalPrase=(phrase[0].concat(phrase[1]).concat(phrase[2])).join('')
            document.getElementById(this.targetId).innerHTML=finalPrase;
            first++
            last--
            if(last>=0)this.invertPhrase(phrase,first,last)
        }, this.transition);
    }
    changeLetters=(index,phrase1,phrase2)=>
    {
        setTimeout(() => {            
            phrase1[0][index]=phrase2[0][index]
            phrase1[2].reverse()
            phrase1[2][index]=phrase2[2][index]
            phrase1[2].reverse()
            index--;
            let finalPrase=(phrase1[0].concat(phrase2[1]).concat(phrase1[2])).join('')
            document.getElementById(this.targetId).innerHTML=finalPrase;
            if(index>=0)this.changeLetters(index,phrase1,phrase2)
            else 
            {
                let last=phrase2[0].length-1
                phrase2[2].reverse()
                let first=0;
                this.invertPhrase(phrase2,first,last)
            }
        }, this.transition);
    }
    fragmentPhrase=(phrase)=>
    {
        phrase=phrase.split('');
        let len=phrase.length
        let arr=[]
        if(len%2===0)
        {
            arr[0]=phrase.splice(0,len/2)
            arr[1]=[];
            arr[2]=phrase
        }
        else 
        {
            arr[0]=phrase.splice(0,(len-1)/2)
            arr[1]=phrase.splice(0,1);
            arr[2]=phrase
        }
        return arr
    }      
}

module.exports=ChangingWord