
import { Button } from "antd";
import { GetKey } from "src/custom/Function";
import { Fragment } from "react";

const ButtonFuctions = ({
    clickFunction,
    clickApprove = true,
    buttonName = null
}) => {
    return (
        <Fragment>
            <div key={GetKey()}>
                <Button className="border-none shadow-none text-green-500" onClick={clickFunction}>
                    {clickApprove && <i className="text-[20px] fa-regular fa-square-check"></i>}
                    {buttonName && <p className="text-black">{buttonName}</p>}
                </Button>
            </div>
        </Fragment>
    )
}

export default ButtonFuctions;
