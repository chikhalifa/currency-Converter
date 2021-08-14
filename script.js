const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const API_URL ="https://api.exchangerate.host/latest";
let html ="";

async function calculateCurrency(){
	const res = await fetch(API_URL);
	const data = await res.json();
	console.log("data result",data)
	console.log("rate",data.rates)
	console.log("exchange date",data.date)
	const rates =data.rates
		$("#result").html(` Current Exchange  Rate Date : ${data.date} `)
	const arrayKeys =Object.keys(data.rates)
	console.log("arrayKeys",arrayKeys)
	arrayKeys.map(item=>{
		// console.log(item)
		return html +=`<option value=${item}>${item}</option>`;

	});
	console.log(`html ${html}`)
	for(let i=0;i<select.length; i++){
		select[i].innerHTML=html;
	}
	function convertCurrency(first,second){
		input[first].value= input[second].value * rates[select[first].value] /rates[select[second].value];
	}
	console.log(`selected value1 ${rates[select[1].value]} ${rates[select[0].value]}`)
	input[0].addEventListener('keyup',()=>convertCurrency(1,0))

	input[1].addEventListener('keyup',()=>convertCurrency(0,1))

	select[0].addEventListener('change',()=>convertCurrency(1,0))

	select[1].addEventListener('change',()=>convertCurrency(0,1))
	

}
calculateCurrency()
$('#select1').change(function (event) {
        console.log($('#select1').val())
        // calculateCurrency()
    });