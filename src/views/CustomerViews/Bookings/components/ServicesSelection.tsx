import React, { useEffect, useState } from "react";
import type { ServicePrototype } from '@/server/programAPI';
import { baseRouter } from "@/router";

export interface serviceInfo {
  serviceName: string;
  avatar?: string;
  duration?: string;
  description: string;
  price?: string;

  uuid: string;

  createdAt?: Date;
  canBookBefore?: number;
  serviceType?: string[];
  state?: string;
  responsibleEmployees?: string[];
}

export interface ServicesSelectionProps {
  data: ServicePrototype[];
  onSelect?: Function;
}
const ServicesSelection: React.FC<ServicesSelectionProps> = (props) => {
  const [selectedService, setSelectedService] = useState<string>();

  const onCheck = (value: string) => {
    const clickedItemInfo = props.data.find((program) => program.uuid === value);

    setSelectedService(value);
    if (props.onSelect) {
      props.onSelect(clickedItemInfo);
    }
  };

  const onChangeInput = () => {};
  return (
    <div className="h-80 overflow-y-auto">
      {props?.data?.map((e) => {
        return (
          <div
            key={e.uuid}
            className="hover:drop-shadow-xl cursor-pointer"
            onClick={() => onCheck(e.uuid)}
          >
            <div className=" p-2 bg-white border rounded-lg">
              <div className="flex md:justify-between">
                <div className="font-bold lg:text-xl">{e.serviceName || 'Title Service'}</div>
                <input type="radio" checked={e.uuid === selectedService} onChange={onChangeInput} />
              </div>
              <div>Program: {e.serviceType}</div>
              <div>{e.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesSelection;
