import React, { useCallback, useState } from 'react';
import { Avatar, TextStyle, Button, Card, TextField, Filters, ResourceItem, ResourceList, Badge, Frame, Banner, Loading, Link } from '@shopify/polaris';

export default function ResourceListExample() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
    const [taggedWith, setTaggedWith] = useState('VIP');
    const [queryValue, setQueryValue] = useState(null);

    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );
    const handleQueryValueChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);

    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const items = [
        {
            id: 112,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            latestOrderUrl: 'orders/1456',
        },
        {
            id: 212,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            latestOrderUrl: 'orders/1457',
        },
    ];

    const promotedBulkActions = [
        {
            content: 'Edit customers',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ];

    const bulkActions = [
        {
            content: 'Add tags',
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Remove tags',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {
            content: 'Delete customers',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ];

    const filters = [
        {
            key: 'taggedWith3',
            label: 'Tagged with',
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    labelHidden
                />
            ),
            shortcut: true,
        },
    ];

    const appliedFilters = !isEmpty(taggedWith)
        ? [
            {
                key: 'taggedWith3',
                label: disambiguateLabel('taggedWith3', taggedWith),
                onRemove: handleTaggedWithRemove,
            },
        ]
        : [];

    const filterControl = (
        <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleQueryValueChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
        >
            <div style={{ paddingLeft: '8px' }}>
                <Button onClick={() => console.log('New filter saved')}>Save</Button>
            </div>
        </Filters>
    );

    return (
        <>
            <div style={{ height: '100px' }}>
                <Frame>
                    <Loading />
                </Frame>
            </div>
            <Banner
                title="High risk of fraud detected"
                action={{ content: 'Review risk analysis' }}
                status="critical"
            >
                <p>
                    Before fulfilling this order or capturing payment, please{' '}
                    <Link url="">review the Risk Analysis</Link> and determine if this order is
    fraudulent.
  </p>
            </Banner>
            <Card>


                <ResourceList
                    resourceName={resourceName}
                    items={items}
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    promotedBulkActions={promotedBulkActions}
                    bulkActions={bulkActions}
                    sortValue={sortValue}
                    sortOptions={[
                        { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
                        { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
                    ]}
                    onSortChange={(selected) => {
                        setSortValue(selected);
                        console.log(`Sort option changed to ${selected}.`);
                    }}
                    filterControl={filterControl}
                />
            </Card>
        </>
    );

    function renderItem(item) {
        const { id, url, name, location, latestOrderUrl } = item;
        const media = <Avatar customer size="medium" name={name} />;
        const shortcutActions = latestOrderUrl
            ? [{ content: 'View latest order', url: latestOrderUrl }]
            : null;
        return (
            <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
                shortcutActions={shortcutActions}
                persistActions
            >
                <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div><Badge status="critical">Not approved</Badge></div>
                <div>{location}</div>
            </ResourceItem>
        );
    }

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'taggedWith3':
                return `Tagged with ${value}`;
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}
