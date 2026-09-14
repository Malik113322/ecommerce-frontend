import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { BsClipboardCheck } from 'react-icons/bs';

const Orders = () => {
    return (
        <Layout title="Your Orders">
            <div className='container py-4'>
                <div className='row g-4'>
                    <div className='col-12 col-md-4 col-lg-3'>
                        <UserMenu />
                    </div>
                    <div className='col-12 col-md-8 col-lg-9'>
                        <div className="card shadow-sm border-0 rounded-4 p-4">
                            <div className="d-flex align-items-center gap-2 border-bottom pb-3 mb-4">
                                <BsClipboardCheck className="text-primary fs-3" />
                                <h3 className="fw-bold mb-0">Order Details</h3>
                            </div>
                            <p className="text-muted">No past orders found.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;