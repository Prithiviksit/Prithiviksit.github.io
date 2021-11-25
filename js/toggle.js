var status = "less";

function toggleText(id)
{
  area = document.getElementById(id).getAttribute("area")
  if (status == "less") {
    document.getElementById(area).innerHTML=document.getElementById(id).getAttribute("ttt");
    document.getElementById(id).innerText = "See Less.";
    status = "more";
  } else if (status == "more") {
    document.getElementById(area).innerHTML = "";
    document.getElementById(id).innerText = "See More.";
    status = "less"
  }
}