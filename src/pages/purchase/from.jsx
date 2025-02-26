import { useState } from "react";
import { motion } from "framer-motion";
import FormOne from "./AddPurchase"; // FormOne ni import qildik
import FormTwo from "./AddPurchaseItems"; // FormTwo ni import qildik

export default function FormSlider() {
  const [activeForm, setActiveForm] = useState(1);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button className="btn btn-info" onClick={() => setShowModal(true)}>
        Add
      </button>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document"> {/* modal-lg bilan kengaytirildi */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Form Modal</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex gap-3 mb-3">
                  <button onClick={() => setActiveForm(1)} className="btn btn-sm btn-primary">
                    Form 1
                  </button>
                  <button onClick={() => setActiveForm(2)} className="btn btn-sm btn-success">
                    Form 2
                  </button>
                </div>
                <motion.div
                  key={activeForm}
                  initial={{ opacity: 0, x: activeForm === 1 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeForm === 1 ? 100 : -100 }}
                  transition={{ duration: 0.4 }}
                  className="w-100"
                >
                  {activeForm === 1 ? <FormOne /> : <FormTwo />}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
