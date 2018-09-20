$(function () {
  var tableItens = localStorage.getItem("tableItens"); 
  tableItens = JSON.parse(tableItens); 
  if (tableItens === null) 
      tableItens = [];

  function Create() {
    var item = JSON.stringify({
        Desc: $("#txtDesc").val(),
        Medida: $("#txtMedida").val(),
        Quantidade: $("#txtQuantidade").val(),
        Preco: $("#txtPreco").val(),
        Perecivel: $("#txtPerecivel").val(),
        Validade: $("#txtValidade").val(),
        Fabricacao: $("#txtFabricacao").val()
    }); 
    tableItens.push(item); // Adiciona ao array
    localStorage.setItem("tableItens", JSON.stringify(tableItens)); // adiciona o array ao localStorage
    alert("O registro foi salvo com sucesso!"); 
    return true;
  }

  function Edit() {
    tableItens[selected_index] = JSON.stringify({
        Desc: $("#txtDesc").val(),
        Medida: $("#txtMedida").val(),
        Quantidade: $("#txtQuantidade").val(),
        Preco: $("#txtPreco").val(),
        Perecivel: $("#txtPerecivel").val(),
        Validade: $("#txtValidade").val(),
        Fabricacao: $("#txtFabricacao").val()
    });

    localStorage.setItem("tableItens", JSON.stringify(tableItens)); 
    alert("O registro foi editado com sucesso!"); 
    return true;
  }

  function Delete() {
    tableItens.splice(selected_index, 1); 
    localStorage.setItem("tableItens", JSON.stringify(tableItens)); 
    alert("Item excluido!"); 
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Descrição</th>" +
            "<th>Quantidade</th>" +
            "<th>Medida</th>" +
            "<th>Preço</th>" +
            "<th>Perecível</th>" +
            "<th>Validade</th>" +
            "<th>Fabricação</th>" +
            "<th>Opções</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tableItens) {
        var item = JSON.parse(tableItens[i]);
        var perecivel = item.Perecivel; 
        if(item.Perecivel=='true'){
            perecivel = 'Sim';
        }else{
            perecivel = 'Não';
        }
        
        var fabricacao = new Date(item.Fabricacao);
        var sFabricacao = fabricacao.toISOString();
        sFabricacao = sFabricacao.substring(8,10)+'/'+sFabricacao.substring(5,7)+'/'+sFabricacao.substring(0,4);
        
        if(item.Validade){
            var vencimento = new Date(item.Validade)     
            var sVencimento = vencimento.toISOString();
            sVencimento = sVencimento.substring(8,10)+'/'+sVencimento.substring(5,7)+'/'+sVencimento.substring(0,4);
        }else{
            sVencimento = '';
        }

        $("#tblList tbody").append("<tr>" +                    
                "<td>" + item.Desc + "</td>" +
                "<td style='text-align: right;'>" + item.Quantidade + "</td>" +
                "<td>" + item.Medida + "</td>" +
                "<td style='text-align: right;'>" +  item.Preco + "</td>" +
                "<td>" + perecivel + "</td>" +
                "<td>" + sVencimento + "</td>" +
                "<td>" + sFabricacao + "</td>" +
                "<td style='text-align: center;'> <span class='btn-group'> <a href='form.html?id="+i+"' class='btnEdit'><i class='fa fa-edit' title='Editar'></i></a> <a href='#' alt='Delete" + i + "' class='btnDelete'><i class='fa fa-trash' title='Excluir'></i></a></span></td>" +
                "</tr>"
                );
    } 
  }

  $("#btnCancel").bind("click", function(){
      window.location.href = "lista.html";
  });

  $("#btnNovo").bind("click", function(){
      window.location.href = "form.html";
  });

  $("#frmItem").bind("submit", function () {
      if (operation === "E"){
          return Edit();}
      else{
          return Create();
      }
  }); 
  
  List();

  $(".btnEdit").bind("click", function () {

      operation = "E"; // Editar
      window.location.replace("form.html");
  });

  $(".btnDelete").bind("click", function () {

      if(confirm('Você realmente deseja excluir o item?')){
          selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
          Delete();
          window.location.href = "lista.html";
      }
  });
});

