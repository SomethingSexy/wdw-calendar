import {
  Delete,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardTitle
} from 'bloomer';
import React, { ReactNode, StatelessComponent } from 'react';

interface IProps {
  children: ReactNode;
  footer: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const InternalModal: StatelessComponent<IProps> = ({ children, footer, isOpen, onClose }) => {
  return (
    <Modal isActive={isOpen}>
      <ModalBackground />
      <ModalCard>
        <ModalCardHeader>
          <ModalCardTitle>Edit Plan</ModalCardTitle>
          <Delete onClick={onClose} />
        </ModalCardHeader>
        <ModalCardBody>
          {children}
        </ModalCardBody>
        <ModalCardFooter>
          {footer}
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  );
};

export default InternalModal;
