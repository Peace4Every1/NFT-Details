import React, { useEffect, useState } from "react";
import {
  PageHeader,
  notification,
  Space,
  Spin,
  Image,
  Divider,
  Badge,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

import { getIpfsImageUrl } from "../helpers/url";
import TextBlock from "../components/TextBlock";
import { contractDetailsApi, stacksApi } from "../api";

const NFTDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferable, setIsTransferable] = useState(false);
  const [transferIsLoading, setTransferIsLoading] = useState(false);

  const { asset_identifier, id } = params;
  const addressData = asset_identifier.slice(0, asset_identifier.indexOf("::"));
  const address = addressData.slice(0, addressData.indexOf("."));
  const name = addressData.slice(addressData.indexOf(".") + 1);

  useEffect(() => {
    setIsLoading(true);
    setTransferIsLoading(true);

    axios
      .get(contractDetailsApi(addressData, id))
      .then((res) => {
        setDetails(res.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setIsLoading(false);
        notification.warning({
          message: "Couldn't find the details :(",
          duration: 2,
          placement: "top",
        });
      });

    axios
      .get(stacksApi(address, name))
      .then((res) => {
        const transferFunction = res?.data.functions.find(
          (fn) => fn.name === "transfer"
        );

        setIsTransferable(Boolean(transferFunction));
        setTransferIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setTransferIsLoading(false);
      });
  }, [address, name, addressData, id]);

  const { token_metadata, nft_token_attributes, token_id } = details ?? {};
  const { image_url } = token_metadata ?? {};

  return (
    <div className="layout">
      <PageHeader
        title="NFT Details"
        className="header details-header"
        onBack={() => window.history.back()}
        backIcon={<LeftOutlined className="back-icon" />}
      />
      <div>
        <Space size="middle">
          <Spin size="large" spinning={isLoading} />
        </Space>
        {isTransferable && !transferIsLoading ? (
          <Badge.Ribbon text="Transferable!" color="green" placement="start">
            <Image src={getIpfsImageUrl(image_url)} placeholder={true} />
          </Badge.Ribbon>
        ) : (
          <Image src={getIpfsImageUrl(image_url)} placeholder={true} />
        )}
      </div>
      <div className="container">
        <p className="regular-text title">Item Details</p>
        <Divider className="divider" />
        <p className="title-sm align-left">Identifier:</p>
        <p className="regular-text align-left asset-id">{asset_identifier}</p>
        {token_id && <TextBlock title="ID Value" value={token_id} />}
        {Boolean(nft_token_attributes?.length) && (
          <div>
            <p className="regular-text title attributes-title">Attributes</p>
            {nft_token_attributes.map(({ trait_type, value }, index) => (
              <TextBlock title={trait_type} value={value} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetails;
