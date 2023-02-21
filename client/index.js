const API_KEY = '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';
let list = [];
async function getResponse() {
    const prompt = document.querySelector("#inp").value;
   
    document.querySelector("#spin").innerHTML=`
    <p>Please wait! Getting data...</p>
    <div style="margin-bottom:0.5rem" class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    `;
    try{
      const response = await fetch('http://localhost:8000/',{method:'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({prompt: prompt})});
      const data = await response.json();
      list.unshift({question:prompt,answer:data.result});
      display();
      document.querySelector("#inp").value='';
    }
    catch(error){
      console.log(error);
    }
  }

  function display(){
    document.querySelector("#spin").innerHTML='';
    let html=`
    <div class="card" id="card">
        <div class="card-body">
            <h5 class="card-title" id="question"><i class="bi bi-person-fill"></i> ${list[0].question}</h5>
            <code class="card-text" id="message" style="color:#99FFCD"><i class="bi bi-robot">. Bot Generated -</i> ${list[0].answer}</code>
        </div>
    </div>
    `;
    
    document.querySelector("#content").insertAdjacentHTML("afterend", html);
    document.querySelector("#contact").innerHTML = '';
  }