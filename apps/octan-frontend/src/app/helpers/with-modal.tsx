import { DefaultFcProps } from "common"
import { useState } from "react";
import { Dialog, DialogTypes } from "shared-components";
import { useSubscriber } from "utils"

export enum showModalActions {
  showWarning = 'modal.showWarning'
}

export const withModal = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [type, setType] = useState(DialogTypes.Info)

  const [isOpen, setIsOpen] = useState(false);

  useSubscriber((dataPayload: any) => {
    switch (dataPayload.action) {
      case showModalActions.showWarning:
        setType(dataPayload.type)
        setTitle(dataPayload.title)
        setSubTitle(dataPayload.subTitle)
        setIsOpen(true)
        break;
    }
  }, [])

  return (
    <>
      <Component {...props} />
      {isOpen && (
        <Dialog
          type={type}
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          title={title}
          subTitle={subTitle}
        />
      )}
    </>
  )
}