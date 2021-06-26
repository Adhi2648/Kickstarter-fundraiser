import React, { Component } from 'react';
import Layout from "../../components/layout";
import { Card, Grid, Button } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3"
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";


class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address)
        const summary = await campaign.methods.getSummary().call()
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    }

    renderCards() {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;
        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: 'The manager created this campaign and can create requests to retrieve money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (Wei)",
                description: 'You must contribute at least this much wei to become an approver',
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description: "A request tries to get approvals from approvers and to withdraw money from the Contract "
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: 'Number of people who contributed to this campaign',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Campaign Balance (ether)",
                description: 'The balance left in this Campaign',
            }
        ];
        return <Card.Group items={items} />
    }
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a><Button primary style={{ marginTop: '20px' }}>View Requests</Button></a>
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;