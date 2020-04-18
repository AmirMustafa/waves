import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment);

      //   let payment = {
      //     paid: true,
      //     cancelled: false,
      //     payerID: "5TE27DDEFHFJG",
      //     paymentID: "PAYID-L2JLDDQ1HH244895K6025509",
      //     paymentToken: "EC-6UA68144215181137",
      //     returnUrl:
      //       "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2JLDDQ1HH244895K6025509&token=EC-6UA68144215181137&PayerID=5TE27DDEFHFJG",
      //     address: {
      //       recipient_name: "Amir Mustafa",
      //       line1: "1 Main St",
      //       city: "San Jose",
      //       state: "CA",
      //       postal_code: "95131",
      //       country_code: "US"
      //     },
      //     email: "amirengg15@personal.example.com"
      //   };
    };
    const onCancel = data => {
      // console.log(JSON.stringify(data));
      this.props.transactionCancelled(data);
    };
    const onError = err => {
      // console.log(JSON.stringify(err));
      this.props.transactionError(err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AXZTnEjiZ6tr6YA3HnkSeaYwBiZdlIKPVUB_xapgqOB6kZht-N0N-JOfNxoLk_BKmFgEP0QxKpyPv-lt",
      production: ""
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}
export default Paypal;
