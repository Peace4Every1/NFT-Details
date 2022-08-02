import React, { useCallback, useState } from "react";
import { PageHeader, Input, Button, Space, Spin, notification } from "antd";
import axios from "axios";

import "./App.css";
import ResultBlock from "./components/ResultBlock";
import { NFTApi } from "./api";

const App = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const lookUp = useCallback(() => {
    setIsLoading(true);

    axios
      .get(NFTApi(address))
      .then((res) => {
        setResult(res.data?.nft_events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setIsLoading(false);
        notification.warning({
          message: "No NFTs found",
          duration: 2,
          placement: "top",
        });
      });
  }, [address]);

  return (
    <div className="layout">
      <PageHeader title="NFTs Lookup" className="header" />
      <div className="container">
        <p className="regular-text align-left">Stack Address:</p>
        <Input
          className="search"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button className="search-btn" type="primary" onClick={lookUp}>
          Look up
        </Button>
        <Space size="middle">
          <Spin size="large" spinning={isLoading} />
        </Space>
        {Boolean(result?.length) && (
          <>
            <p className="regular-text align-left">Results</p>
            {result.map((item, index) => (
              <ResultBlock
                address={item?.asset_identifier}
                id={item?.value.repr?.slice(1)}
                key={index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
