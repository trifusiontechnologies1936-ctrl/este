<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Trifusion – Cotizador & Admin</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <link rel="stylesheet" href="style.css">

  <style>
    body{
      background:#0b0f14;
      color:#e6eef8;
      font-family:Arial,Helvetica,sans-serif;
      margin:0;
      padding:20px;
    }

    .layout{
      display:flex;
      gap:20px;
      align-items:flex-start;
    }

    /* ==================== SIDEBAR PREMIUM ==================== */
    .sidebar{
      width:300px;
      background:linear-gradient(180deg,#064e3b,#021f1b);
      border-radius:20px;
      padding:20px;
      box-shadow:0 0 50px rgba(0,0,0,0.6);
      border:1px solid #0d9488;
      position:sticky;
      top:20px;
    }

    .sidebar h1{
      margin:0;
      font-size:22px;
      font-weight:700;
      display:flex;
      align-items:center;
      gap:10px;
    }

    .sidebar-section{
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.1);
      border-radius:14px;
      padding:14px;
      margin-top:16px;
    }

    .sidebar label{
      font-size:12px;
      color:#a7f3d0;
    }

    .sidebar input, .sidebar textarea, .sidebar select{
      width:100%;
      padding:8px;
      margin-top:4px;
      margin-bottom:8px;
      background:#0f172a;
      color:white;
      border:1px solid #1e293b;
      border-radius:8px;
    }

    .btn{
      padding:10px;
      background:#10b981;
      border:none;
      border-radius:10px;
      color:white;
      cursor:pointer;
      font-weight:bold;
      width:100%;
      transition:0.2s;
    }
    .btn:hover{
      background:#059669;
    }

    .btn-secondary{
      background:#334155;
    }
    .btn-secondary:hover{
      background:#1e293b;
    }

    .btn-danger{
      background:#dc2626;
      color:white;
      border:none;
      padding:6px 10px;
      border-radius:8px;
      cursor:pointer;
    }

    /* ===================== MAIN AREA ===================== */
    .main{
      flex:1;
      background:#0f141a;
      padding:20px;
      border-radius:20px;
      border:1px solid rgba(255,255,255,0.04);
      box-shadow:0 0 40px rgba(0,0,0,0.3);
    }

    table{
      width:100%;
      border-collapse:collapse;
      margin-top:10px;
    }

    table th, table td{
      padding:8px;
      border-bottom:1px solid rgba(255,255,255,0.08);
    }

    .text-right{text-align:right;}
    .text-center{text-align:center;}
  </style>
</head>

<body>
<div class="layout">

<!-- ========================================================= -->
<!-- ===============  SIDEBAR ADMIN (IZQUIERDA) =============== -->
<!-- ========================================================= -->

<aside class="sidebar">
  <h1>⚡ Trifusion Admin</h1>

  <!-- LOGIN -->
  <div id="loginSection" class="sidebar-section">
    <h3>Iniciar sesión</h3>

    <label>Correo administrador</label>
    <input id="username" type="email">

    <label>Contraseña</label>
    <input id="password" type="password">

    <button class="btn" onclick="login()">Entrar</button>
  </div>

  <!-- PANEL ADMIN -->
  <div id="adminSection" style="display:none;">
    <!-- Datos Tienda -->
    <div class="sidebar-section">
      <h3>Datos de la tienda</h3>

      <label>Nombre tienda</label>
      <input id="storeNameInput" type="text">

      <label>Teléfono</label>
      <input id="storePhoneInput" type="text">

      <label>Dirección</label>
      <input id="storeAddressInput" type="text">

      <label>Logo</label>
      <input id="logoInput" type="file" accept="image/*">

      <img id="logoPreview" style="max-width:100%;margin-top:10px;border-radius:10px;display:none;">

      <button class="btn" onclick="guardarSettings()">Guardar tienda</button>
    </div>

    <!-- Crear producto -->
    <div class="sidebar-section">
      <h3>Nuevo producto</h3>

      <label>Código (opcional)</label>
      <input id="codigoProducto">

      <label>Nombre</label>
      <input id="nombreProducto">

      <label>Precio</label>
      <input id="precioProducto" type="number">

      <label>Descripción</label>
      <input id="descripcionProducto">

      <button class="btn" onclick="crearProducto()">Agregar</button>
    </div>

    <!-- Excel -->
    <div class="sidebar-section">
      <h3>Cargar Excel</h3>

      <input id="excelInput" type="file" accept=".xlsx">
      <p id="excelStatus" style="font-size:12px;color:#67e8f9;"></p>
    </div>

    <!-- Listado Productos -->
    <div class="sidebar-section">
      <h3>Productos cargados</h3>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th class="text-right">Precio</th>
            <th class="text-center">Código</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tablaProductos"></tbody>
      </table>
    </div>

    <!-- Cotizaciones -->
    <div class="sidebar-section">
      <h3>Cotizaciones recientes</h3>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody id="tablaQuotes"></tbody>
      </table>
    </div>

    <button class="btn-secondary" onclick="logout()">Cerrar sesión</button>
  </div>
</aside>

<!-- FIN PARTE 1 -->
<!-- ========================================================= -->
<!-- =====================  COTIZADOR (DERECHA) =============== -->
<!-- ========================================================= -->

<main class="main">

  <!-- ENCABEZADO FACTURA -->
  <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px;">
    <img id="logoFactura" style="width:90px;height:90px;border-radius:12px;display:none;">
    <div>
      <h1 id="storeNameDisplay" style="margin:0;font-size:24px;">Trifusion Technologies</h1>
      <div style="font-size:14px;color:#93c5fd;">
        WhatsApp: <span id="storePhoneDisplay">829-872-5163</span><br>
        <span id="storeAddressDisplay">Autopista de San Isidro</span>
      </div>
    </div>
  </div>

  <!-- DATOS CLIENTE -->
  <div class="sidebar-section" style="margin-bottom:20px;">
    <h2 style="margin-top:0;">Datos del cliente</h2>

    <label>Cliente</label>
    <input id="clienteNombre" type="text">

    <label>Documento</label>
    <input id="clienteDocumento" type="text">

    <label>Teléfono</label>
    <input id="clienteTelefono" type="text">

    <label>Dirección</label>
    <input id="clienteDireccion" type="text">

    <label>Fecha</label>
    <input id="fechaFactura" type="date">
  </div>

  <!-- SELECCIÓN DE PRODUCTOS -->
  <div class="sidebar-section">
    <h2 style="margin-top:0;">Agregar productos</h2>

    <label>Producto</label>
    <select id="productoSeleccionado"></select>

    <label>Cantidad</label>
    <input id="cantidadProducto" type="number" min="1" value="1">

    <label style="font-size:14px;display:flex;align-items:center;gap:6px;margin:8px 0;">
      <input type="checkbox" id="aplicarItbis" checked style="width:auto;">
      Aplicar ITBIS 18%
    </label>

    <button class="btn" onclick="agregarALaFactura()">Agregar a la cotización</button>
  </div>

  <!-- TABLA DETALLE -->
  <div class="sidebar-section" style="margin-top:20px;">
    <h2 style="margin-top:0;">Detalle</h2>

    <div style="max-height:300px;overflow:auto;">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th class="text-center">Cant.</th>
            <th class="text-right">Precio</th>
            <th class="text-right">Importe</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tablaFactura"></tbody>
      </table>
    </div>

    <div style="margin-top:14px;font-size:15px;">
      <div class="text-right">Subtotal: <span id="subtotalFactura">RD$ 0.00</span></div>
      <div class="text-right">ITBIS: <span id="itbisFactura">RD$ 0.00</span></div>
      <div class="text-right" style="font-weight:bold;color:#10b981;">Total: <span id="totalFactura">RD$ 0.00</span></div>
    </div>

    <div style="display:flex;gap:10px;margin-top:16px;">
      <button class="btn-secondary" style="flex:1;" onclick="nuevaFactura()">Nueva</button>
      <button class="btn-secondary" style="flex:1;" onclick="guardarEnFirestore()">Guardar</button>
      <button class="btn" style="flex:1;" onclick="window.print()">PDF</button>
    </div>
  </div>

</main>

</div><!-- layout -->

<!-- FIN PARTE 2 -->
<!-- ========================================================= -->
<!-- ===============  FIREBASE SDKs (COMPAT MODE) ============== -->
<!-- ========================================================= -->

<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-storage-compat.js"></script>

<!-- Archivo externo con tus llaves -->
<script src="firebase-config.js"></script>

<script>
/* ============================================================
   ==============  CARGA DE DATOS PÚBLICOS  ====================
   ============================================================ */

let productos = [];
let itemsFactura = [];

function formatearRD(v){
  return "RD$ " + Number(v).toFixed(2);
}

async function cargarSettingsPublic(){
  try{
    const doc = await db.collection("settings").doc("principal").get();
    if(doc.exists){
      const data = doc.data();

      document.getElementById("storeNameDisplay").textContent = data.store_name || "Trifusion Technologies";
      document.getElementById("storePhoneDisplay").textContent = data.phone || "829-872-5163";
      document.getElementById("storeAddressDisplay").textContent = data.address || "Autopista de San Isidro";

      if(data.logo){
        const img = document.getElementById("logoFactura");
        img.src = data.logo;
        img.style.display = "block";
      }
    }
  }catch(e){
    console.error("Error cargando settings:", e);
  }
}

async function cargarProductosPublic(){
  try{
    const snap = await db.collection("products").orderBy("createdAt","desc").get();
    productos = [];

    const select = document.getElementById("productoSeleccionado");
    select.innerHTML = "<option value=''>-- Selecciona --</option>";

    snap.forEach(doc=>{
      const d = doc.data();
      const p = {
        id: doc.id,
        name: d.name,
        price: Number(d.price),
        description: d.description || "",
        code: d.code || ""
      };
      productos.push(p);

      let op = document.createElement("option");
      op.value = p.id;
      op.textContent = `${p.name} (RD$ ${p.price.toFixed(2)})`;
      select.appendChild(op);
    });
  }catch(e){
    console.error("Error cargando productos:", e);
  }
}

/* ============================================================
   ==============        COTIZADOR        ======================
   ============================================================ */

function agregarALaFactura(){
  const id = document.getElementById("productoSeleccionado").value;
  const cantidad = Number(document.getElementById("cantidadProducto").value);

  if(!id){ alert("Selecciona un producto"); return; }
  if(cantidad <= 0){ alert("Cantidad inválida"); return; }

  const p = productos.find(x=>x.id === id);
  if(!p){ return; }

  const existente = itemsFactura.find(i=>i.id === id);
  if(existente){
    existente.quantity += cantidad;
  }else{
    itemsFactura.push({
      id,
      name: p.name,
      price: p.price,
      quantity: cantidad
    });
  }

  renderFactura();
  actualizarTotales();
}

function renderFactura(){
  const tbody = document.getElementById("tablaFactura");
  tbody.innerHTML = "";

  if(itemsFactura.length === 0){
    let tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5" class="text-center">No hay productos agregados.</td>`;
    tbody.appendChild(tr);
    return;
  }

  itemsFactura.forEach((it,idx)=>{
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${it.name}</td>
      <td class="text-center">${it.quantity}</td>
      <td class="text-right">${formatearRD(it.price)}</td>
      <td class="text-right">${formatearRD(it.price * it.quantity)}</td>
      <td class="text-right">
        <button class="btn-danger" onclick="eliminarItem(${idx})">X</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function eliminarItem(i){
  itemsFactura.splice(i,1);
  renderFactura();
  actualizarTotales();
}

function actualizarTotales(){
  let subtotal = itemsFactura.reduce((acc,it)=>acc + it.price * it.quantity,0);
  let aplicar = document.getElementById("aplicarItbis").checked;
  let itbis = aplicar ? subtotal * 0.18 : 0;
  let total = subtotal + itbis;

  document.getElementById("subtotalFactura").textContent = formatearRD(subtotal);
  document.getElementById("itbisFactura").textContent = formatearRD(itbis);
  document.getElementById("totalFactura").textContent = formatearRD(total);
}

function nuevaFactura(){
  itemsFactura = [];
  renderFactura();
  actualizarTotales();
}

async function guardarEnFirestore(){
  if(itemsFactura.length === 0){
    alert("La cotización está vacía.");
    return;
  }

  const subtotal = itemsFactura.reduce((acc,it)=>acc + it.price * it.quantity,0);
  const aplicar = document.getElementById("aplicarItbis").checked;
  const itbis = aplicar ? subtotal * 0.18 : 0;
  const total = subtotal + itbis;

  const data = {
    client_name: document.getElementById("clienteNombre").value || null,
    document_id: document.getElementById("clienteDocumento").value || null,
    phone: document.getElementById("clienteTelefono").value || null,
    address: document.getElementById("clienteDireccion").value || null,
    quote_date: document.getElementById("fechaFactura").value || null,
    items: itemsFactura,
    subtotal,
    tax: itbis,
    total,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try{
    await db.collection("quotes").add(data);
    alert("Cotización guardada exitosamente.");
    cargarQuotesAdmin();
  }catch(e){
    alert("Error guardando cotización.");
    console.error(e);
  }
}

function inicializarFecha(){
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth()+1).padStart(2,"0");
  const dd = String(hoy.getDate()).padStart(2,"0");
  document.getElementById("fechaFactura").value = `${yyyy}-${mm}-${dd}`;
}

/* ============================================================
   ==============   AUTO-LOAD (PÁGINA INICIAL)    ==============
   ============================================================ */

window.addEventListener("DOMContentLoaded", ()=>{
  inicializarFecha();
  cargarSettingsPublic();
  cargarProductosPublic();
});
</script>

<!-- FIN PARTE 3 -->
<!-- ========================================================= -->
<!-- =============  LIBRERÍA PARA EXCEL (XLSX)  =============== -->
<!-- ========================================================= -->
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

<script>
/* ============================================================
   ==============     PANEL ADMIN (SIDEBAR)     =================
   ============================================================ */

function mostrarAdmin(logged,user){
  const loginSec = document.getElementById("loginSection");
  const adminSec = document.getElementById("adminSection");

  if(logged){
    loginSec.style.display = "none";
    adminSec.style.display = "block";
  }else{
    loginSec.style.display = "block";
    adminSec.style.display = "none";
  }
}

/* ---------- LOGIN / LOGOUT ---------- */

async function login(){
  const email = document.getElementById("username").value.trim();
  const pass  = document.getElementById("password").value;

  if(!email || !pass){
    alert("Escribe correo y contraseña.");
    return;
  }

  try{
    await auth.signInWithEmailAndPassword(email,pass);
    // onAuthStateChanged se encargará de cargar la data
  }catch(e){
    console.error(e);
    alert("Error de inicio de sesión: " + (e.message || ""));
  }
}

function logout(){
  auth.signOut();
}

/* Escucha cambios de sesión */
auth.onAuthStateChanged(user=>{
  if(user){
    mostrarAdmin(true,user);
    cargarTodoAdmin();
  }else{
    mostrarAdmin(false,null);
  }
});

/* ---------- CARGA GENERAL ADMIN ---------- */

async function cargarTodoAdmin(){
  await Promise.all([
    cargarSettingsAdmin(),
    cargarProductosAdmin(),
    cargarQuotesAdmin()
  ]);
}

/* ---------- SETTINGS ADMIN ---------- */

async function cargarSettingsAdmin(){
  try{
    const docSnap = await db.collection("settings").doc("principal").get();
    if(docSnap.exists){
      const d = docSnap.data();
      document.getElementById("storeNameInput").value   = d.store_name || "";
      document.getElementById("storePhoneInput").value  = d.phone || "";
      document.getElementById("storeAddressInput").value= d.address || "";

      if(d.logo){
        const img = document.getElementById("logoPreview");
        img.src = d.logo;
        img.style.display = "block";
        img.dataset.base64 = d.logo;
      }
    }
  }catch(e){
    console.error("Error cargando settings admin:", e);
  }
}

document.getElementById("logoInput").addEventListener("change", handleLogoUpload);

function handleLogoUpload(ev){
  const file = ev.target.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = e =>{
    const img = document.getElementById("logoPreview");
    img.src = e.target.result;
    img.style.display = "block";
    img.dataset.base64 = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function guardarSettings(){
  const nombre  = document.getElementById("storeNameInput").value.trim();
  const phone   = document.getElementById("storePhoneInput").value.trim();
  const address = document.getElementById("storeAddressInput").value.trim();
  const img     = document.getElementById("logoPreview");
  const logo64  = img.dataset.base64 || null;

  try{
    await db.collection("settings").doc("principal").set({
      store_name: nombre  || "Trifusion Technologies",
      phone:      phone   || "829-872-5163",
      address:    address || "Autopista de San Isidro",
      logo:       logo64,
      updatedAt:  firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});

    alert("Datos de tienda guardados.");
    // Refresca encabezado público
    cargarSettingsPublic();
  }catch(e){
    console.error(e);
    alert("Error guardando datos de tienda.");
  }
}

/* ---------- PRODUCTOS ADMIN ---------- */

async function cargarProductosAdmin(){
  try{
    const snap = await db.collection("products").orderBy("createdAt","desc").get();
    const tbody = document.getElementById("tablaProductos");
    const select = document.getElementById("productoSeleccionado");

    tbody.innerHTML = "";
    select.innerHTML = "<option value=''>-- Selecciona --</option>";
    productos = [];

    snap.forEach(doc=>{
      const d = doc.data();
      const p = {
        id: doc.id,
        name: d.name,
        price: Number(d.price)||0,
        code: d.code || "",
        description: d.description || ""
      };
      productos.push(p);

      // Tabla admin
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.name}</td>
        <td class="text-right">${formatearRD(p.price)}</td>
        <td class="text-center">${p.code}</td>
        <td class="text-right">
          <button class="btn-danger" onclick="borrarProducto('${doc.id}')">X</button>
        </td>
      `;
      tbody.appendChild(tr);

      // Combo cotizador
      let op = document.createElement("option");
      op.value = p.id;
      op.textContent = `${p.name} (RD$ ${p.price.toFixed(2)})`;
      select.appendChild(op);
    });

  }catch(e){
    console.error("Error cargando productos admin:", e);
  }
}

async function crearProducto(){
  const code  = (document.getElementById("codigoProducto").value || "").trim();
  const name  = (document.getElementById("nombreProducto").value || "").trim();
  const precioRaw = document.getElementById("precioProducto").value;
  const desc  = (document.getElementById("descripcionProducto").value || "").trim();

  const price = parseFloat(String(precioRaw).replace(",","."))

  if(!name || isNaN(price)){
    alert("Nombre y precio válidos son obligatorios.");
    return;
  }

  try{
    await db.collection("products").add({
      name,
      code: code || null,
      price,
      description: desc,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Producto agregado.");

    // Limpia campos
    document.getElementById("codigoProducto").value="";
    document.getElementById("nombreProducto").value="";
    document.getElementById("precioProducto").value="";
    document.getElementById("descripcionProducto").value="";

    // Recarga
    cargarProductosAdmin();
  }catch(e){
    console.error(e);
    alert("Error agregando producto.");
  }
}

async function borrarProducto(id){
  if(!confirm("¿Eliminar este producto?")) return;
  try{
    await db.collection("products").doc(id).delete();
    cargarProductosAdmin();
  }catch(e){
    console.error(e);
    alert("Error eliminando producto.");
  }
}

/* ---------- CARGA DE EXCEL ---------- */

document.getElementById("excelInput").addEventListener("change", procesarExcel);

function procesarExcel(ev){
  const file = ev.target.files[0];
  if(!file) return;

  const status = document.getElementById("excelStatus");
  status.textContent = "Procesando archivo...";

  const reader = new FileReader();
  reader.onload = e =>{
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data,{type:"array"});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet,{defval:""});

    const lista = [];
    rows.forEach(r=>{
      const nombre = r.nombre || r.Nombre || r.NOMBRE || "";
      const precioR = r.precio || r.Precio || r.PRECIO || "";
      const desc   = r.descripcion || r.Descripcion || r.DESCRIPCION || "";
      const codigo = r.codigo || r.Codigo || r.CÓDIGO || "";

      const price = parseFloat(String(precioR).toString().replace(",","."));      
      if(nombre && !isNaN(price)){
        lista.push({
          name:nombre,
          price:price,
          description:desc,
          code:codigo
        });
      }
    });

    if(!lista.length){
      status.textContent = "No se encontraron filas válidas.";
      return;
    }

    enviarBulkProductos(lista);
  };
  reader.readAsArrayBuffer(file);
}

async function enviarBulkProductos(lista){
  const status = document.getElementById("excelStatus");
  try{
    const batch = db.batch();
    lista.forEach(p=>{
      const ref = db.collection("products").doc();
      batch.set(ref,{
        name:p.name,
        price:p.price,
        description:p.description || "",
        code:p.code || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
    await batch.commit();
    status.textContent = `Se agregaron ${lista.length} productos desde Excel.`;
    cargarProductosAdmin();
  }catch(e){
    console.error(e);
    status.textContent = "Error al guardar productos.";
  }
}

/* ---------- COTIZACIONES ADMIN ---------- */

async function cargarQuotesAdmin(){
  try{
    const snap = await db.collection("quotes")
      .orderBy("createdAt","desc")
      .limit(50)
      .get();

    const tbody = document.getElementById("tablaQuotes");
    tbody.innerHTML = "";

    snap.forEach(doc=>{
      const d = doc.data();
      const fecha = d.quote_date || (d.createdAt && d.createdAt.toDate ? d.createdAt.toDate().toISOString().slice(0,10) : "");
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.client_name || ""}</td>
        <td>${d.phone || ""}</td>
        <td class="text-right">${formatearRD(d.total || 0)}</td>
      `;
      tbody.appendChild(tr);
    });

  }catch(e){
    console.error("Error cargando cotizaciones:", e);
  }
}
</script>

</body>
</html>
