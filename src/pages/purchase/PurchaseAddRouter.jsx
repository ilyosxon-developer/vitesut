import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddPurchaseItems from './AddPurchaseItems';
import AddPurchaseForm from './AddPurchase';



function PurchaseAddRouter() {
    return (   
     <div>
      <div className="row">
        <div className="col">
          <Link to="/addpurchaseform"  >General</Link>
        </div>
        <div className="col">
           <Link to="/addpurchasetab">Mahsulot</Link>
        </div>
      </div>
        <Routes>
          <Route path="/" element={<AddPurchaseItems />} />
            <Route path="/addpurchaseform" element={<AddPurchaseForm />} />
          <Route path="/addpurchasetab" element={<AddPurchaseItems />} />
        </Routes>
     </div>
    );
}

export default PurchaseAddRouter;