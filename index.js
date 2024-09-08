const balance=document.querySelector('#balance');
const money_plus=document.querySelector('#money-plus');
const money_min=document.querySelector('#money-min');
const list=document.querySelector('#list');
const form=document.querySelector('#form');
const text=document.querySelector('#text');
const amount=document.querySelector('#amount');
const transaction=[]
function trans(alltransaction){
  const sign=alltransaction.amount<0? '-' : '+';
  const item=document.createElement('li');
  item .classList.add(
    alltransaction.amount<0? 'mins':'plus'
  )
  item.innerHTML=`
  ${alltransaction.text}<span>${sign}${Math.abs(alltransaction.amount)}</span>
  <button class="delbtn" onclick="remove(${alltransaction.id})">x</button>
  `
  list.appendChild(item)
}
function addtras(e){
  e.preventDefault();
  if(text.value===''||amount.value===''){
    alert('enter the value');
  }else{
const transactions={
  id:generateId(),
  text:text.value,
  amount:+amount.value
}
transaction.push(transactions)
trans(transactions)
updata()
  }
}
function generateId(){
  return Math.floor(Math.random() * 3);
}

function updata(){
  const amounts=transaction.map(trs=>trs.amount);
  const total=amounts.reduce((res,curr)=>(res +=curr),0).toFixed(2);
  const income=amounts.filter(amt=>amt>0).reduce((res,item)=>(res=+item),0).toFixed(2);
  const expenses=(amounts.filter(amt=>amt<0).reduce((res,item)=>(res=-item),0)*-1).toFixed(2);
  balance.innerText=`${total}`;
  money_plus.innerText=`${income}`;
  money_min.innerText=`${expenses}`;

}
function remove(id){
  transaction = transaction.findIndex(transactions => transactions.id === id);

    IniT();
  

}
 function IniT(){
  list.innerHTML=""
  transaction.forEach(trans)
  updata()
 }
 IniT()
form.addEventListener("submit",addtras)