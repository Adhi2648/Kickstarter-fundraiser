
import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from "semantic-ui-react"
import factory from "../ethereum/factory";
import Layout from "../components/layout"
import { Link } from "../routes"

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaign() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (<Link route={`/campaigns/${address}`}> View Campaign </Link>),
                fluid: true,
                style: { overflowWrap: 'break-word' }
            }
        })
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button floated='right' content="Create Campaign" icon="add" primary>
                            </Button>
                        </a>
                    </Link>
                    <div >  {this.renderCampaign()}</div>
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;