import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance
  } from 'wagmi';

  import {
    Box,
    Typography,
    Button,
    styled
  } from "@mui/material";
  
const Container = styled(Box)`
height: 50vh;
width:50wh;
margin:10rem;
background:#b2ebf2;
color:white;
display:flex;
flex-flow:column;
justify-content:center;
align-items:center;

`;
const Text = styled(Typography)`
 color:#00838f;
 font-weight:bold;
 font-size:1.5rem;
`;

const WalleteButton = styled(Button)`
 margin:0.5rem;
 width:20rem;
 background:#00acc1;
`;
const Main = styled(Box)`
height: 50vh;
width:50wh;
margin:10rem;
background:#b2ebf2;
color:white;
display:flex;
flex-flow:column;
justify-content:center;
align-items:center;
`;
const WalleteButton2 = styled(Button)`
 margin:0.5rem;
 width:20rem;
 background:#00acc1;
 color:white;
`;
const Text2 = styled(Typography)`
 font-size:1.5rem;
 color:#00838f;
`;
const Text3 = styled(Typography)`
 font-size:1.2rem;
 color:#03a9f4;
`;
const Text4 = styled(Typography)`
color:black;
`;

  export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data } = useBalance({
        address: address,
      })
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
  
    if (isConnected) {
      return (
        <Main>
          {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
          <Text2>Address :{ensName ? `${ensName} (${address})` : address}</Text2>
          <Text2>Balance: {data?.formatted} {data?.symbol}</Text2>
          <Text3>Connected With {connector.name}</Text3>
          <WalleteButton2 variant="contained" onClick={disconnect}>Disconnect</WalleteButton2>
        </Main>
      )
    }
  
    return (
      <Container>
         <Text>Connect to Wallete</Text>
        {connectors.map((connector) => (
           
          <WalleteButton
          variant='contained'
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </WalleteButton>
        ))}
  
        {error && <Text4>{error.message}</Text4>}
      </Container>
    )
  }
  

//   endless session obey maple rebuild add own shock ball hole exile spider
//patrol glow shiver acoustic slide boy swear tobacco flush coach despair water