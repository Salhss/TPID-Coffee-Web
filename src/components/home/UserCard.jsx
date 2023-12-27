import QRCode from "react-qr-code";
import "./UserCard.css";

export default function UserCard(props) {
  const { user } = props;
  console.log(user)

  const formattedNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <>
      <div className="card-container p-5">
        <div className="card bg-white rounded-xl px-4 py-3 shadow-md">
          <div className="user-greet flex flex-col gap-1">
            <p className=" text-xs font-medium">Good Afternoon,</p>
            <p className=" text-sm font-semibold">{user.name}</p>
          </div>
          <div className="user-info flex items-center gap-3 mt-2">
            <div className="border p-3 rounded-full shadow">
                <QRCode style={{ height: "auto", maxWidth: "100%", width: "100%"}} size={20} value={user.qrcode}/>
            </div>
            <div className="user-saldo border-l-[1px] border-l-gray-700 pl-3 px-0 border-dotted w-[70%]">
                <div className="flex items-center w-full justify-between">
                    <p className="text-xs">Saldo</p>
                    <p className="text-xs font-semibold">Rp. {formattedNumber(+user.saldo)}</p>
                </div>
                <div className="flex items-center w-full justify-between mt-1">
                    <p className="text-xs">Points</p>
                    <p className="text-xs font-semibold text-[#94D8C0]">{formattedNumber(+user.point)}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
